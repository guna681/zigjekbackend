<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProviderserviceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('providerservice', function(Blueprint $table)
		{
			$table->increments('Id');
			$table->integer('ProviderId')->nullable();
			$table->integer('CategoryId');
			$table->integer('SubCategoryId')->nullable();
			$table->integer('Experience')->nullable();
			$table->integer('PricePerHour')->nullable()->default(0);
			$table->string('QuickPitch')->nullable()->default('');
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
		Schema::drop('providerservice');
	}

}
