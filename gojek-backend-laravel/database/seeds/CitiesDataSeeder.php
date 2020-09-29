<?php

use Illuminate\Database\Seeder;

class CitiesDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $cities=file_get_contents(public_path('/database/json/'.'cities.json'));
        $cities=json_decode($cities);
        foreach($cities as $data)
        {
            foreach($data as $key=> $value)
            {
                $finaldata[$key]=$value;
            }
            DB::table('cities')->insert($finaldata);
        }
        
        $this->command->info("cities Table Inserted");
    }
}
