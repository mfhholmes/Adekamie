<?php
namespace BrightSparksLabs\Adekamie;
require_once "PHPUnit/Autoload.php";

/**
 * Contains the setup code for the Edulab test database classes
 *
 * @author Marcus
 */
abstract class Edulab_Abstract_Test_Db extends \PHPUnit_Extensions_Database_TestCase{
    static private $pdo = null;
    private $testdb = null;
    
    public function getConnection(){
        if($this->testdb === null){
            if(self::$pdo === null){
                self::$pdo = new \PDO($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD']);
            }
            $this->testdb = $this->createDefaultDBConnection(self::$pdo, 'edulab');
        }
        return $this->testdb;
    }
    protected function getDataSet(){
        $base_ds =  $this->createMySQLXMLDataSet('edulab.xml');
        //$data_ds = new Edulab_Data_Array($data);
        
        $datasets = array();
        $datasets[] = $base_ds;
        //$datasets[] = $data_ds;
        
        $joint_ds = new \PHPUnit_Extensions_Database_DataSet_CompositeDataSet($datasets);
        //$joint_ds->addDataSet($base_ds);
        //$joint_ds->addDataSet($data_ds);
        return $joint_ds;
    }

}
class Edulab_Data_Array extends \PHPUnit_Extensions_Database_DataSet_AbstractDataSet
{
    protected $tables = array();
    
    public function __construct(array $data){
        foreach($data AS $tableName => $rows){
            if(isset($rows[0])){
                $columns = array_keys($rows[0]);
            }
            $metadata = new \PHPUnit_Extensions_Database_DataSet_DefaultTableMetaData($tableName,$columns);
            $table = new \PHPUnit_Extenstions_Database_DataSet_DefaultTable($metadata);
            
            foreach($rows AS $row){
                $table->addRow($row);
            }
            $this->tables[$tableName] = $table;
        }
    }
    
    protected function createIterator($reverse = FALSE){
        return new \PHPUnit_Extensions_Database_DataSet_DefaultTableIterator($this->tables, $reverse);
    }
    public function getTable($tableName){
        $result = $this->tables([$tableName]);
        if(!isset($result)){
            throw new InvalidArgumentException("$tableName is not a table in the database");
        }
        return $result;
    }
}

?>
