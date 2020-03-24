<?php

use Illuminate\Database\Seeder;
use App\Oauthclients;

class OauthClientTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //


        Oauthclients::insert([
            [

                'name' => 'Laravel Personal Access Client',
                'secret' => 'cNMdDFr9ZnyP6EmMikfhzT8ykld3JcM5qVYeMmMQ',
                'redirect' => 'http://localhost',
                'personal_access_client'=>1,
                'password_client'=>0,
                'revoked'=>0,
                'created_at'=>NOW(),
                'updated_at'=> NOW()],
            [

                'name' 	   => 'Laravel Personal Access Client',
                'secret'   => 'hOFoUZI9uL7bWYdeIsZZhZBk2mDT9aMxNieVuhCV',
                'redirect' => 'http://localhost',
                'personal_access_client'=>0,
                'password_client'=>1,
                'revoked' =>0,
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ],
            [

                'name' 	   => 'Laravel Personal Access Client',
                'secret'   => 'aTRPArohnaUq6jJDlV7ZiYU8p1hdrSfFY2PyqnvJ',
                'redirect' => 'http://localhost',
                'personal_access_client'=>0,
                'password_client'=>1,
                'revoked' =>0,
                'created_at'=>NOW(),
                'updated_at'=> NOW()
            ]
        ]);


    }
}
