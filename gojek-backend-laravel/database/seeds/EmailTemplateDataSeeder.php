<?php

use Illuminate\Database\Seeder;

class EmailTemplateDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $emailtemplate=file_get_contents(public_path('/database/json/'.'emailtemplate.json'));
        $emailtemplate=json_decode($emailtemplate);
        foreach($emailtemplate as $data)
        {
            foreach($data as $key=> $value)
            {
                $finaldata[$key]=$value;
            }
            DB::table('emailtemplate')->insert($finaldata);
        }
        
        $this->command->info("emailtemplate Table Inserted");
    }
}
