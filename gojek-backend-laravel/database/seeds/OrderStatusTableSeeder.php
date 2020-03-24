<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderStatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('Order_Status')->insert([
            ['name' => "Recived","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')],
            ['name' => "Canceled","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')],
            ['name' => "Confirmed","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')],
            ['name' => "PickedUp","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')],
            ['name' => "Deliverd","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')],
            ['name' => "Refunded","created_at" => date('Y-m-d H:i:s'),
                "updated_at"=> date('Y-m-d H:i:s')]
        ]);
    }
}
