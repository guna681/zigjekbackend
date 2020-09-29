<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBookingTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('booking', function(Blueprint $table)
		{
			$table->bigInteger('Id', true);
			$table->bigInteger('UserId');
			$table->integer('UserDeviceId')->nullable();
			$table->bigInteger('ProviderId')->nullable();
			$table->integer('RideTypeId')->nullable();
			$table->string('FromLocation')->nullable();
			$table->string('ToLocation')->nullable();
			$table->string('CancelledFor')->nullable();
			$table->decimal('SourceLat', 10, 6)->nullable()->default(0.000000);
			$table->decimal('SourceLong', 10, 6)->nullable()->default(0.000000);
			$table->decimal('DestinyLat', 10, 6)->nullable()->default(0.000000);
			$table->decimal('DestinyLong', 10, 6)->nullable()->default(0.000000);
			$table->string('S2CellId', 20)->nullable();
			$table->string('Status', 45)->nullable();
			$table->integer('Distance')->nullable();
			$table->decimal('Estimation', 10)->nullable();
			$table->text('CurrencyType')->nullable();
			$table->decimal('Tax', 10)->nullable()->default(0.00);
			$table->integer('WaitingCharges')->nullable();
			$table->decimal('TotalAmount', 10)->nullable();
			$table->string('Description')->nullable();
			$table->string('OutletName')->nullable();
			$table->string('ContactNo', 15)->nullable();
			$table->integer('CountryId')->nullable();
			$table->string('CancelledBy', 11)->nullable();
			$table->string('RideName', 50)->nullable();
			$table->string('VehicleName', 100)->nullable();
			$table->decimal('ProviderEarning', 10)->nullable();
			$table->decimal('TotalEarning', 10)->nullable();
			$table->string('PaymentMode', 10)->nullable()->default('cash');
			$table->string('CardId')->nullable();
			$table->string('IsActive', 11)->nullable()->default('yes');
			$table->text('ProviderRejectedIds')->nullable();
			$table->text('AssignedProviderIds')->nullable();
			$table->string('IsUserReviewed', 10)->nullable()->default('no');
			$table->string('IsCouponApplied', 50)->nullable()->default('no');
			$table->integer('RedeemedId')->nullable();
			$table->decimal('DiscountAmount', 10)->nullable();
			$table->string('CouponCode', 50)->nullable();
			$table->string('BookingType', 50)->nullable()->default('now');
			$table->integer('SeatCount')->nullable()->default(0);
			$table->string('EmailStatus', 5)->nullable()->default('no');
			$table->string('IsPool', 8)->nullable();
			$table->dateTime('BookingTimestamp')->nullable();
			$table->timestamp('CreateAt')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->timestamp('UpdateAt')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->integer('outletId')->nullable();
			$table->float('netAmount', 10)->nullable();
			$table->string('orderReferenceId')->nullable();
			$table->string('orderStatus')->nullable();
			$table->float('deliverycharge', 10)->nullable();
			$table->integer('deliveryAddressId')->nullable();
			$table->timestamps();
			$table->string('lastMile', 45)->nullable()->default('0');
			$table->string('firstMile', 45)->nullable()->default('0');
			$table->dateTime('eta')->nullable();
			$table->string('Type', 11)->nullable()->default('taxi');
			$table->integer('serviceCommission')->nullable()->default(0);
			$table->integer('ServiceCategoryId')->nullable();
			$table->integer('ServiceSubCategoryId')->nullable();
			$table->integer('ServiceGroupId')->nullable();
			$table->text('ServiceStatuLogs')->nullable();
			$table->text('ServiceTimeSlot')->nullable();
			$table->string('ServiceStartImage')->nullable();
			$table->string('ServiceEndImage')->nullable();
			$table->text('ServiceIds')->nullable();
			$table->text('ServiceAddons')->nullable();
			$table->boolean('markReady')->nullable()->default(0);
			$table->dateTime('deliveryStartTimeSlot')->nullable();
			$table->dateTime('deliveryEndTimeSlot')->nullable();
			$table->string('prescriptionimageUrl', 1000)->nullable();
			$table->dateTime('confirmedTime')->nullable();
			$table->string('isRated', 45)->nullable()->default('NOTRATED');
			$table->string('orderSuggestions')->nullable();
			$table->integer('paid_provider')->nullable()->default(0);
			$table->integer('paid_outlet')->nullable()->default(0);
			$table->decimal('outletEarnings', 10)->nullable()->default(0.00);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('booking');
	}

}
