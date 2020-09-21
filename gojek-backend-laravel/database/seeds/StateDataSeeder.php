<?php

use Illuminate\Database\Seeder;

class StateDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $state=file_get_contents(public_path('/database/json/'.'state.json'));
        $state=json_decode($state);
        foreach($state as $data)
        {
            foreach($data as $key=> $value)
            {
                $finaldata[$key]=$value;
            }
            DB::table('state')->insert($finaldata);
        }
        
        $this->command->info("state Table Inserted");
    }
}
