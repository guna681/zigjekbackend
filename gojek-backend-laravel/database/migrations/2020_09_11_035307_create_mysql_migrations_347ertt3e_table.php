<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMysqlMigrations347ertt3eTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mysql_migrations_347ertt3e', function(Blueprint $table)
		{
			$table->string('timestamp', 254)->unique('timestamp');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('mysql_migrations_347ertt3e');
	}

}
