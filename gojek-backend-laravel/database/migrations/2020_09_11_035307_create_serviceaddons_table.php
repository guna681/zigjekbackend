<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateServiceaddonsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('serviceaddons', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->integer('CategroyId')->nullable();
			$table->integer('SubCategoryId')->nullable();
			$table->integer('GroupId')->nullable();
			$table->integer('TitleId')->nullable();
			$table->string('Name');
			$table->decimal('Price', 10)->nullable();
			$table->string('CurrencyType', 11)->nullable();
			$table->boolean('IsFixedPrice')->nullable();
			$table->decimal('PricePerHour', 10)->nullable();
			$table->boolean('Status')->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('serviceaddons');
	}

}
