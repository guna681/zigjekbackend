<?php

namespace App\Http\Service;

use App\Http\Repository\SettingRepostitory;


Class  SettingService
{

    public function getValue($arg)
    {

        $settingRepository = new SettingRepostitory();
        return $data = $settingRepository->getValue($arg);

    }

    public function getIntegrationValue($arg)
    {
        $settingRepository = new SettingRepostitory();
        return $data = $settingRepository->getIntegrationValue($arg);
    }

}