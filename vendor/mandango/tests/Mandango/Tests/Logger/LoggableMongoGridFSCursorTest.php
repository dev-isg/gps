<?php

/*
 * This file is part of Mandango.
 *
 * (c) Pablo Díez <pablodip@gmail.com>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Mandango\Tests\Logger;

use Mandango\Tests\TestCase;
use Mandango\Logger\LoggableMongo;
use Mandango\Logger\LoggableMongoGridFSCursor;

class LoggableMongoGridFSCursorTest extends TestCase
{
    protected $log;

    public function testConstructorAndGetCollection()
    {
        $mongo = new LoggableMongo();
        $db = $mongo->selectDB('mandango_logger');
        $grid = $db->getGridFS('mandango_logger_grid');

        $cursor = new LoggableMongoGridFSCursor($grid);

        $this->assertSame($grid, $cursor->getGrid());
    }

    public function testLog()
    {
        $mongo = new LoggableMongo();
        $mongo->setLoggerCallable(array($this, 'log'));
        $db = $mongo->selectDB('mandango_logger');
        $grid = $db->getGridFS('mandango_logger_grid');
        $cursor = $grid->find();

        $cursor->log($log = array('foo' => 'bar'));

        $this->assertSame(array_merge(array(
            'database'   => 'mandango_logger',
            'collection' => 'mandango_logger_grid.files',
            'gridfs'     => 1,
        ), $log), $this->log);
    }

    public function log(array $log)
    {
        $this->log = $log;
    }
}
