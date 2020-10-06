<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWalletTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('wallet', function(Blueprint $table)
		{
			$table->bigInteger('Id', true);
			$table->bigInteger('UserTypeId')->nullable();
			$table->string('UserType', 50)->nullable();
			$table->bigInteger('CurrencyId')->nullable();
			$table->string('Secret')->nullable();
			$table->decimal('Balance', 10)->default(0.00);
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
		Schema::drop('wallet');
	}

}
