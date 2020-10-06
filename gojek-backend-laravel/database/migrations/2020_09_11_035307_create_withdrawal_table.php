<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWithdrawalTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('withdrawal', function(Blueprint $table)
		{
			$table->increments('Id');
			$table->integer('ProviderId')->nullable();
			$table->decimal('Amount', 10)->nullable();
			$table->string('Status', 50)->nullable();
			$table->string('TansactionId')->nullable();
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
		Schema::drop('withdrawal');
	}

}
