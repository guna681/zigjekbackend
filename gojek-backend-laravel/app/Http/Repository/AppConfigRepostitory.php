<?php
namespace App\Http\Repository;

use App\AppConfig;
use App\Http\Service\AppconfigService;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Model;
use DB;
use App\Http\Utility\Constant;


Class AppConfigRepostitory extends AppConfig {
	private $data = array();
	
  public function getAppConfig()
  {

      $data = AppConfig::select()
                    ->get();
      return $data;
  }



}
