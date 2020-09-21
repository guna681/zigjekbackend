<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProviderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('provider', function(Blueprint $table)
		{
			$table->bigInteger('Id', true);
			$table->string('FirstName');
			$table->string('LastName');
			$table->string('Image')->nullable()->default('');
			$table->string('Email')->unique('Email');
			$table->string('Mobile', 15)->unique('Mobile');
			$table->string('Password')->nullable()->default('');
			$table->string('ExtCode', 5);
			$table->string('CountryId', 11)->default('');
			$table->string('LoginType')->nullable()->default('');
			$table->boolean('IsMobileVerified')->nullable();
			$table->boolean('IsEmailVerified')->nullable();
			$table->string('Status', 10)->nullable()->default('');
			$table->bigInteger('WalletId')->nullable();
			$table->string('MobileBrand', 45)->nullable();
			$table->string('MobileModel', 45)->nullable();
			$table->string('DeviceId')->nullable();
			$table->string('GCMId')->nullable();
			$table->string('AccessToken')->nullable();
			$table->string('AppVersion', 45)->nullable();
			$table->string('OS', 45)->nullable();
			$table->string('OSVersion', 45)->nullable();
			$table->decimal('Latitude', 10, 6)->nullable();
			$table->decimal('Longitude', 10, 6)->nullable();
			$table->integer('Bearing')->nullable();
			$table->string('S2CellId', 20)->nullable();
			$table->decimal('Rating', 2, 1)->nullable()->default(0.0);
			$table->string('StripeAccountID')->nullable();
			$table->string('SocialToken')->nullable();
			$table->integer('ActiveVehicleId')->nullable();
			$table->string('VehicleBrand', 11)->nullable();
			$table->string('VehicleModel')->nullable();
			$table->string('VehicleNumber')->nullable();
			$table->decimal('Earnings', 10)->nullable()->default(0.00);
			$table->string('IsActive', 45)->nullable();
			$table->string('Language')->nullable();
			$table->integer('TripCount')->nullable()->default(0);
			$table->boolean('IsDeliveryOpt')->default(0);
			$table->string('Type', 50)->nullable();
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
		Schema::drop('provider');
	}

}
