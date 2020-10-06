<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSpecialtariffTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('specialtariff', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->string('Name')->nullable();
			$table->integer('Distance')->nullable();
			$table->integer('MinCharge')->nullable();
			$table->integer('MaxCharge')->nullable();
			$table->time('FromHours')->nullable();
			$table->time('ToHours')->nullable();
			$table->integer('RideTypeId')->nullable();
			$table->integer('CountryId')->nullable();
			$table->integer('RideVechicleTypeId')->nullable();
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
		Schema::drop('specialtariff');
	}

}
