<?php

use Illuminate\Database\Seeder;

class FieldTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('FieldType')->insert([
            ['fieldType'=>"EDITTEXT",'type' => "STRING",'validationType'=>"email", 'status'=> "1","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')],
            ['fieldType'=>"EDITTEXT",'type' => "NUMBER",'validationType'=>"number", 'status'=> "1","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')],
            ['fieldType'=>"EDITTEXT",'type' => "STRING",'validationType'=>"text", 'status'=> "1","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')],
            ['fieldType'=>"EDITTEXT",'type' => "TEXT",'validationType'=>"text", 'status'=> "1","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')],
            ['fieldType'=>"FILE",'type' => "FILE",'validationType'=>"file", 'status'=> "1","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')],
            ['fieldType'=>"IMAGE",'type' => "FILE",'validationType'=>"file", 'status'=> "1","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')],
            ['fieldType'=>"RADIO",'type' => "STRING",'validationType'=>"radio", 'status'=> "1","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')],
            ['fieldType'=>"CHECKBOX",'type' => "STRING",'validationType'=>"checkbox", 'status'=> "1","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')],
        ]);
    }
}
