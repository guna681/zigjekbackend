<?php

use Illuminate\Database\Seeder;

class CountryDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $country=file_get_contents(public_path('/database/json/'.'country.json'));
        $country=json_decode($country);
        foreach($country as $data)
        {
            foreach($data as $key=> $value)
            {
                $finaldata[$key]=$value;
            }
            DB::table('country')->insert($finaldata);
        }
        
        $this->command->info("country Table Inserted");
    }
}
