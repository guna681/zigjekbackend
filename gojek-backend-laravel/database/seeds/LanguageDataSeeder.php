<?php

use Illuminate\Database\Seeder;

class LanguageDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $language=file_get_contents(public_path('/database/json/'.'language.json'));
        $language=json_decode($language);
        foreach($language as $data)
        {
            foreach($data as $key=> $value)
            {
                $finaldata[$key]=$value;
            }
            DB::table('language')->insert($finaldata);
        }
        
        $this->command->info("language Table Inserted");
    }
}
