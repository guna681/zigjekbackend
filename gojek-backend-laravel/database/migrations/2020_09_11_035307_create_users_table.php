<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->bigInteger('Id', true);
			$table->string('FirstName');
			$table->string('LastName');
			$table->text('Image')->nullable();
			$table->string('Email')->unique('Email');
			$table->string('Mobile', 15)->default('');
			$table->string('Password')->nullable();
			$table->string('ExtCode', 5)->nullable();
			$table->string('CountryId', 5)->default('');
			$table->string('LoginType');
			$table->boolean('IsMobileVerified')->nullable();
			$table->boolean('IsEmailVerified')->nullable();
			$table->string('Status', 10)->nullable();
			$table->bigInteger('WalletId')->nullable()->unique('WalletId');
			$table->decimal('Rating', 2, 1)->nullable()->default(0.0);
			$table->string('StripeCustomerID')->nullable();
			$table->string('SocialToken')->nullable();
			$table->string('Language')->nullable();
			$table->float('latitude', 10, 6)->nullable();
			$table->float('longitude', 10, 6)->nullable();
			$table->integer('CurrentAddressId')->nullable();
			$table->timestamp('CreateAt')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('UpdateAt')->nullable();
			$table->string('deviceToken', 500)->nullable();
			$table->string('os', 45)->nullable();
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
		Schema::drop('users');
	}

}
