<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTransactionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('transaction', function(Blueprint $table)
		{
			$table->bigInteger('Id', true);
			$table->string('UserType', 50)->nullable();
			$table->string('Description')->nullable();
			$table->integer('UserTypeId')->nullable();
			$table->decimal('Amount', 10)->nullable();
			$table->string('Type', 50)->nullable();
			$table->string('Status', 50)->nullable()->default('pending');
			$table->integer('WithdrawalId')->nullable();
			$table->timestamp('CreateAt')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->timestamp('UpdateAt')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('transaction');
	}

}
