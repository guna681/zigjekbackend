<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProviderpaymentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('providerpayment', function(Blueprint $table)
		{
			$table->bigInteger('Id', true);
			$table->string('PaymentField', 50)->nullable();
			$table->string('Value')->nullable();
			$table->bigInteger('ProviderId')->nullable();
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
		Schema::drop('providerpayment');
	}

}
