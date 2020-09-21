<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(AdminDataSeeder::class);
        $this->call(AppConfigDataSeeder::class);
        $this->call(CitiesDataSeeder::class);
        $this->call(CountryDataSeeder::class);
        $this->call(EmailSettingDataSeeder::class);
        $this->call(EmailTemplateDataSeeder::class);
        $this->call(IntegrationSettingDataSeeder::class);
        $this->call(LanguageDataSeeder::class);
        $this->call(PeekChargesDataSeeder::class);
        $this->call(ServiceTitleDataSeeder::class);
        $this->call(SettingDataSeeder::class);
        $this->call(TimeSlotDataSeeder::class);

    }
}
