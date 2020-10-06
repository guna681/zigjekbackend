<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRidevehicletypeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ridevehicletype', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->integer('RideTypeId')->nullable();
			$table->string('Name', 45)->nullable();
			$table->text('IconPassive')->nullable();
			$table->text('IconActive')->nullable();
			$table->integer('CountryId')->nullable();
			$table->text('StateIds')->nullable();
			$table->text('CityIds')->nullable();
			$table->decimal('BaseCharge', 10)->nullable();
			$table->decimal('MinCharge', 10)->nullable()->comment('As per KM');
			$table->string('CurrencyType')->nullable();
			$table->integer('CommissionPercentage')->nullable();
			$table->decimal('WaitingCharge', 10)->nullable();
			$table->integer('Capacity')->nullable();
			$table->string('ShortDesc', 50)->nullable();
			$table->string('LongDesc')->nullable();
			$table->string('IsActive')->nullable();
			$table->string('IsPoolEnabled', 3)->nullable()->default('no');
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
		Schema::drop('ridevehicletype');
	}

}
