<?php

use Illuminate\Database\Seeder;

class EmailSettingDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $emailsetting=file_get_contents(public_path('/database/json/'.'emailsetting.json'));
        $emailsetting=json_decode($emailsetting);
        foreach($emailsetting as $data)
        {
            foreach($data as $key=> $value)
            {
                $finaldata[$key]=$value;
            }
            DB::table('emailsetting')->insert($finaldata);
        }
        
        $this->command->info("emailsetting Table Inserted");
    }
}
