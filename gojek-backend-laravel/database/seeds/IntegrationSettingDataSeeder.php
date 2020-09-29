<?php

use Illuminate\Database\Seeder;

class IntegrationSettingDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $integrationsetting=file_get_contents(public_path('/database/json/'.'integrationsetting.json'));
        $integrationsetting=json_decode($integrationsetting);
        foreach($integrationsetting as $data)
        {
            foreach($data as $key=> $value)
            {
                $finaldata[$key]=$value;
            }
            DB::table('integrationsetting')->insert($finaldata);
        }
        
        $this->command->info("integrationsetting Table Inserted");
    }
}
