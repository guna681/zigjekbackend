<?php

use Illuminate\Database\Seeder;

class ServiceTitleDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $servicetitle=file_get_contents(public_path('/database/json/'.'servicetitle.json'));
        $servicetitle=json_decode($servicetitle);
        foreach($servicetitle as $data)
        {
            foreach($data as $key=> $value)
            {
                $finaldata[$key]=$value;
            }
            DB::table('servicetitle')->insert($finaldata);
        }
        
        $this->command->info("servicetitle Table Inserted");
    }
}
