<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCouponTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('coupon', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('couponName');
			$table->string('couponCode');
			$table->string('discountPerscentage', 5);
			$table->float('maxDiscount', 10, 6);
			$table->date('dateStart')->nullable();
			$table->date('dateEnd')->nullable();
			$table->integer('status')->default(0);
			$table->string('couponImage')->nullable();
			$table->timestamps();
			$table->integer('outletId');
			$table->integer('couponStatus')->nullable()->default(0);
			$table->integer('isDeleted')->nullable()->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('coupon');
	}

}
