<?php

use Illuminate\Database\Seeder;

class SettingDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $setting=file_get_contents(public_path('/database/json/'.'setting.json'));
        $setting=json_decode($setting);
        foreach($setting as $data)
        {
            foreach($data as $key=> $value)
            {
                $finaldata[$key]=$value;
            }
            DB::table('setting')->insert($finaldata);
        }
        
        $this->command->info("setting Table Inserted");
    }
}
