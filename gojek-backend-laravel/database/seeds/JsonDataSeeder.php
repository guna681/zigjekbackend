<?php

use Illuminate\Database\Seeder;

class JsonDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $jsondata=DB::table('peekcharges')->get();
        $jsondata=json_encode($jsondata);
        $destpath=public_path().'/database/json/';
        if(!is_dir($destpath)){
            mkdir($destpath,0777,true);
        }
        File::put($destpath."peekcharges.json",$jsondata);
        $this->command->info('Json Created for peekcharges!');
    }
}
