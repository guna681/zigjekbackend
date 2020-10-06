<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBannerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('banner', function(Blueprint $table)
		{
			$table->bigInteger('Id', true);
			$table->string('Title')->nullable();
			$table->string('Image_path')->nullable();
			$table->string('Description')->nullable();
			$table->string('Url')->nullable();
			$table->string('Status')->nullable();
			$table->timestamp('CreateAt')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('UpdateAt')->nullable();
			$table->string('hasSubCategory', 45)->nullable()->default('1');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('banner');
	}

}
