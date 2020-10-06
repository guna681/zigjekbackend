<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCouponredeemedTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('couponredeemed', function(Blueprint $table)
		{
			$table->bigInteger('Id', true);
			$table->integer('UserId');
			$table->string('Amount')->nullable();
			$table->string('DiscountAmount')->nullable();
			$table->string('Status')->nullable()->default('pending');
			$table->integer('BookingId')->nullable();
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
		Schema::drop('couponredeemed');
	}

}
