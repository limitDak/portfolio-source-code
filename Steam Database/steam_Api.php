<?php
/* Servers usually allow GET requests from other domains but allow POST requests only
   from the same domain by default.

   Include headers for cross-domain access control 
*/

header("Access-Control-Allow-Origin: *");

// Allow the following request methods
header("Access-Control-Allow-Methods: GET, OPTIONS, POST, PUT, DELETE");

// Define other parameters
header("Access-Control-Allow-Headers: Content-Type, , Authorization, X-Requested-With");

// include pdo_connect.php file
include('pdo_connect.php');


/* Define variables and assign default values */
$parameterValues = null; // Set the $parameterValues to null

$type = null;

/* Most of the page requests are sent using the GET method
  The 'type' defines the particular task requested.
  Read user input 'type'
*/
if (isset($_GET['type'])) {
    $type = $_GET['type'];
}


// Define response based on the user request (input)
switch ($type) {

    case 'gameTable':
        // Define SQL statement
        $sql = "SELECT * 
        FROM `game_table`";

        // This SQL statement does not use any parameters. Use the default $parameterValues array.
        $response = getAllRecords($sql, $db, $parameterValues);

        break;

    case 'customerTable':
        // Define SQL statement
        $sql = "SELECT * 
        FROM `customer` 
        ORDER BY `customer`.`positive_ratings` DESC";

        // This SQL statement does not use any parameters. Use the default $parameterValues array.
        $response = getAllRecords($sql, $db, $parameterValues);

        break;

    case 'categoryTable':
        // Define SQL statement
        $sql = "SELECT * 
        FROM `types` 
        ORDER BY `Category_ID` ASC";

        // This SQL statement does not use any parameters. Use the default $parameterValues array.
        $response = getAllRecords($sql, $db, $parameterValues);

        break;

    case 'genreTable':
        // Define SQL statement
        $sql = "SELECT * 
        FROM `status`";

        // This SQL statement does not use any parameters. Use the default $parameterValues array.
        $response = getAllRecords($sql, $db, $parameterValues);

        break;

    case 'companyTable':
        // Define SQL statement
        $sql = "SELECT `companies`.`publisher`, `companies`.`developer`, `companies`.`name`, `creates`.`release_date` 
        FROM `companies`, `creates` 
        WHERE `companies`.`appid` = `creates`.`appid` 
        ORDER BY `companies`.`appid`";

        // This SQL statement does not use any parameters. Use the default $parameterValues array.
        $response = getAllRecords($sql, $db, $parameterValues);

        break;

    case 'playtimeTable':
        // Define SQL statement
        $sql = "SELECT * 
        FROM `time_invested` 
        ORDER BY `time_invested`.`average_playtime` DESC";

        // This SQL statement does not use any parameters. Use the default $parameterValues array.
        $response = getAllRecords($sql, $db, $parameterValues);

        break;

    case 'specificsTable':
        // Define SQL statement
        $sql = "SELECT * 
        FROM `game_specifics` 
        ORDER BY `game_specifics`.`achievements` ASC";

        // This SQL statement does not use any parameters. Use the default $parameterValues array.
        $response = getAllRecords($sql, $db, $parameterValues);

        break;

    case 'activisionTable':
        // Define SQL statement
        $sql = "SELECT `game_table`.`name`, `companies`.`developer` 
        FROM `game_table`, `creates`, `companies` 
        WHERE `game_table`.`appid` = `creates`.`appid` 
        AND `creates`.`appid` = `companies`.`appid` 
        AND `creates`.`publisher` = `companies`.`publisher` 
        AND `companies`.`publisher` = 'Activision'";

        // This SQL statement does not use any parameters. Use the default $parameterValues array.
        $response = getAllRecords($sql, $db, $parameterValues);

        break;

    case 'negativeTable':
        // Define SQL statement
        $sql = "SELECT `game_table`.`name`, `game_table`.`price`, `customer`.`negative_ratings`, `customer`.`positive_ratings`, 
        ABS(`customer`.`negative_ratings` - `customer`.`positive_ratings`) as `difference` 
        FROM `game_table`, `review`, `customer` 
        WHERE `review`.`appid` = `game_table`.`appid` 
        AND `review`.`appid` = `customer`.`appid` 
        AND `customer`.`positive_ratings` < `customer`.`negative_ratings` 
        ORDER BY `difference` DESC";

        // This SQL statement does not use any parameters. Use the default $parameterValues array.
        $response = getAllRecords($sql, $db, $parameterValues);

        break;

    case 'storedCategoryTable':
        // Define SQL statement
        $value = 0;

        if (isset($_GET['formValue']))
            $value = $_GET['formValue'];

        if ($value == 0 || $value == null)
            $value = 1;


        $sql = "CALL `orderByNameWithCategory`(:value)";

        $parameterValues = array(":value" => $value);

        // This SQL statement does not use any parameters. Use the default $parameterValues array.
        $response = getAllRecords($sql, $db, $parameterValues);

        break;

    case 'storedGenreTable':
        // Define SQL statement
        $value = 0;

        if (isset($_GET['formValue']))
            $value = $_GET['formValue'];

        if (
            $value == 0 || $value == null
        )
            $value = 1;


        $sql = "CALL `orderByNameWithGenre`(:value)";

        $parameterValues = array(":value" => $value);

        // This SQL statement does not use any parameters. Use the default $parameterValues array.
        $response = getAllRecords($sql, $db, $parameterValues);

        break;

    default:
        $response = array();
        break;
} // end switch


/* $response is an  array of matching records ( array of associative arrays). The server response must be a string so we
have to convert this array into a string with a format that is easy to convert to
an array of Javascript objects.

We use the json_encode() method to convert the $response into a string using a format which can
easily be converted into an array of JavaScript objects called JSON objects.
*/
echo json_encode($response);


function getAllRecords($sql, $db, $values = null)
{

    /* Input values:
1. SQL statement that includes 'named' parameters

2. Database connection

3. (Optional) Values for 'named' parameters, if there are any 'named' parameters in the SQL statement

Output: Array of matching result records. Each element in the array is an associative array.

*/
    // prepare SQL statement
    $stm = $db->prepare($sql);
    // execute SQL statement
    $stm->execute($values);
    // fetch all records
    $result = $stm->fetchAll(PDO::FETCH_ASSOC);
    // return the result set
    return $result;
}
