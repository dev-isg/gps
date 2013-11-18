
<?php 
//try{ 
//$mongo = new Mongo();
//$databases=$mongo->listDBs();
//echo '<pre>';
//print_r($databases);
//$mongo->close();
//}
//catch(MongoConnectionException $e){
//die($e->getMessage());
//}
// Configuration
	// Configuration
	$dbhost = '192.168.1.50';
	$dbname = 'db_gps2';
	$m = new Mongo("mongodb://$dbhost");
	$db = $m->$dbname;
	$c_users = $db->empresa;
	$user = array(
		//'ruc' => 4556987,
		//'_id' =>  "ObjectId(528553c3bfa7b02d6edb4326)"
	);
       	$users = $c_users->findOne();
        var_dump($users);exit;
        $user1 = array(
                'id'=>'5',
   		'login' => 'carro222',
		'rol' => 'empresanueva',
                'pass' => 'carro1'
	);
        
      $users = $c_users->findOne($user);
       $va=$users['usuario_id'];
       $user22 = array(
		//'ruc' => 4556987,
		'_id' => $va
	);
        $c_users2 = $db->usuario;
  $users = $c_users2->findOne($user22);
//        $lang = array('login'=>'chebre');
        $c_users->update($user);exit;
//        $c_users->insert($user1);
//	$users = $c_users->findOne($user);
	var_dump($users);
        
        