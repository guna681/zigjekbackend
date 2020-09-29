<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProvidervehicleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('providervehicle', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->bigInteger('ProviderId')->nullable();
			$table->string('VehicleImage')->nullable();
			$table->string('VehicleBrandName')->nullable();
			$table->string('VehicleModelName')->nullable();
			$table->text('RideVehicleTypeId')->nullable();
			$table->string('VehicleNumber', 50)->nullable();
			$table->date('Year')->nullable();
			$table->string('Color', 50)->nullable();
			$table->string('Status', 10)->nullable();
			$table->string('IsActive', 45)->nullable();
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
		Schema::drop('providervehicle');
	}

}
