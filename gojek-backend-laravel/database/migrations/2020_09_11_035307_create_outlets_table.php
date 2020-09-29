<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOutletsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('outlets', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('restaurantId')->unsigned()->index('outlets_restaurantid_index');
			$table->string('email')->nullable();
			$table->string('password')->nullable();
			$table->string('name');
			$table->string('image');
			$table->boolean('isPureVeg');
			$table->float('costForTwo', 10, 3);
			$table->boolean('isExculsive')->nullable();
			$table->boolean('isOfferAvailable')->default(0);
			$table->boolean('preparationTime')->nullable();
			$table->decimal('deliveryCharges', 10)->nullable()->default(20.00);
			$table->string('addressLineOne')->nullable();
			$table->string('addressLineTwo')->nullable();
			$table->string('street')->default('');
			$table->string('area')->default('');
			$table->string('city')->default('');
			$table->string('state')->default('');
			$table->string('country')->nullable();
			$table->string('zipcode', 10)->nullable();
			$table->decimal('latitude', 10, 6)->nullable();
			$table->decimal('longitude', 10, 6)->nullable();
			$table->string('s2CellId')->nullable();
			$table->char('s2key', 20)->nullable();
			$table->string('contactNumber');
			$table->float('restaurantCommission', 10)->nullable();
			$table->integer('status')->nullable()->default(1);
			$table->integer('existLogin')->default(1);
			$table->timestamps();
			$table->decimal('totalAmount', 10)->nullable()->default(0.00);
			$table->decimal('balanceAmount', 10)->nullable()->default(0.00);
			$table->integer('serviceCommission')->nullable()->default(0);
			$table->integer('averageRating')->nullable()->default(0);
			$table->integer('isBlocked')->nullable()->default(0);
			$table->string('deviceToken', 500)->nullable();
			$table->string('os', 45)->nullable();
			$table->string('type', 45)->nullable()->default('0');
			$table->integer('packingCharge')->nullable()->default(0);
			$table->string('cuisine', 1000)->nullable()->default('[]');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('outlets');
	}

}
