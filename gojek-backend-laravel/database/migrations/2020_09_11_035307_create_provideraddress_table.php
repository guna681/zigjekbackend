<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProvideraddressTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('provideraddress', function(Blueprint $table)
		{
			$table->increments('Id');
			$table->integer('ProviderId');
			$table->string('Address1')->nullable();
			$table->string('Address2')->nullable();
			$table->string('City', 50)->nullable();
			$table->string('Province')->nullable();
			$table->string('Landmark')->default('');
			$table->decimal('Latitude', 10, 6)->nullable();
			$table->decimal('Longitude', 10, 6)->nullable();
			$table->integer('ZipCode')->nullable();
			$table->boolean('Status')->nullable();
			$table->timestamp('CreateAt')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('UpdateAt')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('provideraddress');
	}

}
