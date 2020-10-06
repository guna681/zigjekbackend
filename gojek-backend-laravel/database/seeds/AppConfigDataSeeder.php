<?php

use Illuminate\Database\Seeder;

class AppConfigDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $appconfig=file_get_contents(public_path('/database/json/'.'appconfig.json'));
        $appconfig=json_decode($appconfig);
        foreach($appconfig as $data)
        {
            foreach($data as $key=> $value)
            {
                $finaldata[$key]=$value;
            }
            DB::table('appconfig')->insert($finaldata);
        }
        
        $this->command->info("appconfig Table Inserted");
    }
}
