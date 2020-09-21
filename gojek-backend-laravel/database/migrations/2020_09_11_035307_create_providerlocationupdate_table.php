<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProviderlocationupdateTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('providerlocationupdate', function(Blueprint $table)
		{
			$table->increments('ProviderId');
			$table->string('S2CellId', 20)->nullable();
			$table->decimal('Latitude', 10, 6)->nullable();
			$table->decimal('Longitude', 10, 6)->nullable();
			$table->integer('Bearing')->nullable();
			$table->text('RideTypeId')->nullable();
			$table->boolean('IsDeliveryOpt')->nullable()->default(0);
			$table->string('IsPoolActive', 3)->nullable()->default('no');
			$table->string('IsPoolEnabled', 3)->nullable()->default('no');
			$table->integer('MaxPoolCapacity')->nullable()->default(4);
			$table->string('Status', 11)->nullable()->default('active');
			$table->timestamp('CreateAt')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
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
		Schema::drop('providerlocationupdate');
	}

}
