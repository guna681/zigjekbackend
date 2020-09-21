<?php

use Illuminate\Database\Seeder;

class TimeSlotDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $timeslot=file_get_contents(public_path('/database/json/'.'timeslot.json'));
        $timeslot=json_decode($timeslot);
        foreach($timeslot as $data)
        {
            foreach($data as $key=> $value)
            {
                $finaldata[$key]=$value;
            }
            DB::table('timeslot')->insert($finaldata);
        }
        
        $this->command->info("timeslot Table Inserted");
    }
}
