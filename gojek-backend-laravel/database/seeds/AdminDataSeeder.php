<?php

use Illuminate\Database\Seeder;

class AdminDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $admin=file_get_contents(public_path('/database/json/'.'admin.json'));
        $admin=json_decode($admin);
        foreach($admin as $data)
        {
            foreach($data as $key=> $value)
            {
                $finaldata[$key]=$value;
            }
            DB::table('admin')->insert($finaldata);
        }
        
        $this->command->info("Admin Table Inserted");
    }
}
