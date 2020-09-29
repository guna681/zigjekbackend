<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateServicesubcategoryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('servicesubcategory', function(Blueprint $table)
		{
			$table->increments('Id');
			$table->integer('CategoryId')->nullable();
			$table->string('Name', 50)->nullable();
			$table->string('Image')->nullable();
			$table->boolean('Status')->default(1);
			$table->boolean('IsFixedPricing')->nullable()->default(0);
			$table->decimal('PricePerHour', 10)->nullable();
			$table->boolean('ServicesDisplayStyle')->nullable()->default(1);
			$table->string('CategorySlideTitle')->nullable();
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
		Schema::drop('servicesubcategory');
	}

}
