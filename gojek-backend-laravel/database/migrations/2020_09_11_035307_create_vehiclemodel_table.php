<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVehiclemodelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vehiclemodel', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->integer('VehicleBrandId')->nullable();
			$table->string('ModelName', 45)->nullable();
			$table->string('VehicleType', 45)->nullable();
			$table->string('PowerBy', 45)->nullable();
			$table->timestamp('CreateAt')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->timestamp('UpdateAt')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('vehiclemodel');
	}

}
