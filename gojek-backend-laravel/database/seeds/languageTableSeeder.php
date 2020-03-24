<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Languages;

class languageTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Languages::create([
            'lang' => 'English',
            'iso' => 'en',
            'default' => 1,
            'status' => 1,
        ]);
    }
}
