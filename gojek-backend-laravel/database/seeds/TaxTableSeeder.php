<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Taxes;

class TaxTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Taxes::create([
            'percentage' => 20,
            'name' => 'GST',
            'status' => true,
        ]);
    }
}
