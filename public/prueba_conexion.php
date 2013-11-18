<?php
 $dbhost = '192.168.1.50';
//       $dbname = 'db_gps2';
       $m = new Mongo("mongodb://$dbhost");
       $db = $m->db_gps2;
       $c_users = $db->usuario;
//       $user = array(
//               'ruc' => 4556987,
////               '_id' =>  "ObjectId(528553c3bfa7b02d6edb4326)"
//       );
//       $users = $c_users->findOne();
       $cursor = $c_users->find();
        foreach ($cursor as $id => $value) {
            echo "$id: ";
            print_r($value);
        }
//       var_dump($users);exit;
