<?php

use Illuminate\Database\Seeder;

class PeekChargesDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $peekcharges=file_get_contents(public_path('/database/json/'.'peekcharges.json'));
        $peekcharges=json_decode($peekcharges);
        foreach($peekcharges as $data)
        {
            foreach($data as $key=> $value)
            {
                $finaldata[$key]=$value;
            }
            DB::table('peekcharges')->insert($finaldata);
        }
        
        $this->command->info("peekcharges Table Inserted");
    }
}
