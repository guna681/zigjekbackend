<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCouponcodeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('couponcode', function(Blueprint $table)
		{
			$table->bigInteger('Id', true);
			$table->decimal('Discount', 10)->default(0.00);
			$table->string('Type')->nullable();
			$table->string('Name')->nullable();
			$table->string('Coupon')->nullable();
			$table->string('Status')->nullable();
			$table->string('Description')->nullable();
			$table->integer('Threshold')->default(0);
			$table->integer('MinValueToRedeem')->default(0);
			$table->integer('MaxValueToRedeem')->default(0);
			$table->string('RedeemableType')->nullable();
			$table->date('ValidFrom');
			$table->date('ValidTo');
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
		Schema::drop('couponcode');
	}

}
