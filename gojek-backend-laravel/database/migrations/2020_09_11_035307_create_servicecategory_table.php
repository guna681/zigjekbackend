<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateServicecategoryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('servicecategory', function(Blueprint $table)
		{
			$table->increments('Id');
			$table->integer('TitleId')->nullable();
			$table->string('Name', 50)->nullable();
			$table->string('Type', 10)->nullable();
			$table->string('Icon')->nullable();
			$table->boolean('Status')->nullable()->default(1);
			$table->boolean('HasSubCategory')->nullable()->default(0);
			$table->boolean('IsFixedPricing')->nullable()->default(0);
			$table->decimal('PricePerHour', 10)->nullable();
			$table->string('DisplayType', 45)->nullable();
			$table->string('DisplayDescription', 100)->nullable();
			$table->dateTime('UpdateAt')->nullable();
			$table->timestamp('CreateAt')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('servicecategory');
	}

}
