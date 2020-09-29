<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePeekchargesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('peekcharges', function(Blueprint $table)
		{
			$table->bigInteger('Id', true);
			$table->string('Name', 50)->nullable();
			$table->string('Type', 50)->nullable();
			$table->text('Week')->nullable();
			$table->date('Day')->nullable();
			$table->time('StartTime')->nullable();
			$table->time('EndTime')->nullable();
			$table->string('Fare')->nullable();
			$table->decimal('MinAmount', 10)->nullable();
			$table->decimal('MaxAmount', 10)->nullable();
			$table->string('Status')->nullable();
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
		Schema::drop('peekcharges');
	}

}
