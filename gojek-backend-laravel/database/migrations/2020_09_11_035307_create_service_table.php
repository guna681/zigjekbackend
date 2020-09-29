<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateServiceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('service', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->integer('CategoryId')->nullable();
			$table->integer('SubCategoryId')->nullable();
			$table->string('SubTitle', 50)->nullable();
			$table->string('Name');
			$table->string('Image')->nullable();
			$table->decimal('Price', 10);
			$table->boolean('IsFixedPrice');
			$table->decimal('PricePerHour', 10);
			$table->boolean('Status');
			$table->integer('Limit')->nullable()->default(2);
			$table->decimal('SlashPrice', 10)->nullable();
			$table->string('CurrencyType')->nullable()->default('$');
			$table->decimal('Commission', 4)->nullable()->default(0.00);
			$table->text('Description')->nullable();
			$table->string('Duration', 50)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('service');
	}

}
