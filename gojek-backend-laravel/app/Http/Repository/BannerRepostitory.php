<?php

namespace App\Http\Repository;


use App\Outlets;
use App\OutletsOfferBanners;
use Illuminate\Database\Eloquent;
use App\Http\Utility\Constant;
use App\Http\Utility\Defaults;
use DB;


class BannerRepostitory
{


    public function addBanner($data)
    {
        DB::beginTransaction();
        $defaults   = new Defaults();
        $images     = $defaults->imageUpload($data->bannerImage, Constant::OFFERSIMAGE);
        if ($data->status == 1) {
            $update = OutletsOfferBanners::where('outletId', $data->outletId)->update(['status' => 0]);
        }
        try {

            $outletsOfferBanners = new OutletsOfferBanners;
            $outletsOfferBanners->outletId      = $data->outletId;
            $outletsOfferBanners->bannerImages  = $images;
            $outletsOfferBanners->status        = $data->status;
            $outletsOfferBanners->save();
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;
    }



    public function listBanners($pageNumber)
    {

        $path    = url('/').'/images/';
        $perPage = Constant::PERPAGE;
        $data    = OutletsOfferBanners::select(DB::raw("CONCAT('$path',Outlets_OfferBanners.bannerImages)as bannerImage,Outlets_OfferBanners.id as bannerId,Outlets_OfferBanners.status,CONCAT(Outlets.name,',',Outlets.area) as outletName"))
                                    ->join('Outlets', 'Outlets_OfferBanners.outletId', '=', 'Outlets.id')
                                    ->whereNull('Outlets_OfferBanners.deleted_at')
                                    ->paginate($perPage, ['*'], 'page', $pageNumber);
        return $data;
    }


    public function deleteBanner($bannerId)
    {

        DB::beginTransaction();
        try {

            $data = OutletsOfferBanners::where('id',$bannerId)->update(['deleted_at'=>Now()]);

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;

    }


}