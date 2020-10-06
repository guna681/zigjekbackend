<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateReviewTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('review', function(Blueprint $table)
		{
			$table->bigInteger('Id', true);
			$table->bigInteger('UserId');
			$table->bigInteger('ProviderId');
			$table->integer('BookingId')->nullable();
			$table->boolean('Rating');
			$table->text('Comments');
			$table->string('ReviewedBy', 45)->nullable();
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
		Schema::drop('review');
	}

}
